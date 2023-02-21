let controller = (function (budgetCtrl, uiCtrl, testsFunc) {

    let setupEventListeners = function(){
        let DOM = uiCtrl.getDomStrings();
        document.querySelector(DOM.form).addEventListener("submit", ctrlAddItem);
    }
    
// функция которая срабатывает при отпрвке формы
    function ctrlAddItem(e) {
        e.preventDefault();
        console.log("fired");

        // Получаем данные из формы
        let input = uiCtrl.getInput();
        console.log(input);
        // контролируем корректность заполненеия полей
        if (input.description !== "" && !isNaN(input.value) && input.value > 0){

            let newItem = budgetCtrl.addItem(input.type, input.description, input.value)
            budgetCtrl.test();

            console.log(newItem);
            console.log(testsFunc);

            uiCtrl.renderListItem(newItem, input.type);
            
            // Очистка форы
            uiCtrl.clearFields();
            testsFunc.init();

        }




    }



    
    return {
        init:function(){
            console.log("App started");
            setupEventListeners();
        }
    }

})(modelController, viewController, tests);

controller.init();