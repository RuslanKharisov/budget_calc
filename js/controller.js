let controller = (function (budgetCtrl, uiCtrl, testsFunc) {

    let setupEventListeners = function(){
        let DOM = uiCtrl.getDomStrings();
        document.querySelector(DOM.form).addEventListener("submit", ctrlAddItem);
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


    function updateBudget (){
        // 1. Расчитать бюджет в модели 
        budgetCtrl.calculateBudget()

        // 2. Получить бюджт из модели
        budgetObj = budgetCtrl.getBudget();
        console.log("🚀 ~ file: controller.js:40 ~ updateBudget ~ budgetObj:", budgetObj)

        // 3. Отобразить бюдежт в шаблоне
        uiCtrl.updateBudget(budgetObj);
        
    }


    return {
        init:function(){
            console.log("App started");
            setupEventListeners();
        }
    }

})(modelController, viewController, tests);

controller.init();