let controller = (function (budgetCtrl, uiCtrl, testsFunc) {

    let setupEventListeners = function(){
        let DOM = uiCtrl.getDomStrings();
        document.querySelector(DOM.form).addEventListener("submit", ctrlAddItem);
// слушаем клик по таблице с расходами и доходами
        document.querySelector(DOM.budgetTable).addEventListener("click", ctrlDeleteItem);
    }
    
// функция которая срабатывает при отпрвке формы
    function ctrlAddItem(e) {
        e.preventDefault();

        // Получаем данные из формы
        let input = uiCtrl.getInput();
        // контролируем корректность заполненеия полей
        if (input.description !== "" && !isNaN(input.value) && input.value > 0){

            let newItem = budgetCtrl.addItem(input.type, input.description, input.value)
            budgetCtrl.test();

            uiCtrl.renderListItem(newItem, input.type);
            
            // Очистка форы
            uiCtrl.clearFields();
            testsFunc.init();

            // console.log("AddItem fired")

            updateBudget ()
        }

    }

    function ctrlDeleteItem(e){

        let itemID, spliID, ID, type;
        // отлавливаем клик по кнопке удалить
        if(e.target.closest(".item__remove")){

            // определение ID который нужно удалить
            itemID = e.target.closest("li.budget-list__item").id; // inc-0
            console.log("🚀 ~ file: controller.js:41 ~ ctrlDeleteItem ~ itemID:", itemID)

            spliID = itemID.split("-")
            type = spliID[0];
            ID = parseInt(spliID[1]);

            // Удаляем запись из модели
            budgetCtrl.deletItem(type, ID);

            // // Удаляем запись из шаблона
            uiCtrl.deleteListItem(itemID);

            updateBudget ()
        }
    }

    function updateBudget (){
        // 1. Расчитать бюджет в модели 
        budgetCtrl.calculateBudget()

        // 2. Получить бюджт из модели
        budgetObj = budgetCtrl.getBudget();

        // 3. Отобразить бюдежт в шаблоне
        uiCtrl.updateBudget(budgetObj);

    }

    return {
        init:function(){
            console.log("App started");
            setupEventListeners();
            uiCtrl.updateBudget({
                budget : 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0,
            });
        }
    }

})(modelController, viewController, tests);

controller.init();