let viewController = (function () {

    let DOMstrings = {
        inputType: "#input__type",
        inputDescription: "#input__description",
        inputValue: "#input__value",
        form: "#budget-form",
        incomeContainer: "#income__list",
        expenseContainer: "#expenses__list",
        budgetLabel: "#budget-value",
        incomeLabel: "#income-label",
        expesesLabel: "#expense-label",
        expencePercentLabel: "#exp-percents-label",
        budgetTable: "#budget-table",
        monthLabel: "#month",
        yearLabel: "#year"
    }

    function getInput(){
        return {
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: document.querySelector(DOMstrings.inputValue).value,
        }
    }

    function formatNumber(num, type){

        let numSplit, int, dec, newInt, resultNum; 

        num = Math.abs(num); // -45.78425983 => 45.78425983
        num = num.toFixed(2); // 45.78

        numSplit = num.split("."); // 45.78 => [45, 78]
        int = numSplit[0]; // 45
        dec = numSplit[1]; // 78

        if (int.length > 3) {
            newInt = "";
            console.log("🚀 ~ newInt:", newInt)

            for (let i = 0; i < int.length / 3; i++){
            console.log("🚀 ~ i:", i);

            newInt = "," + int.substring(int.length - 3 *(i+1), int.length - 3*i) + newInt;
            console.log("newInt:", newInt)
            }

            if(newInt[0] === ","){
                newInt = newInt.substring(1);
                console.log("newInt:", newInt)
            }

        } else if (int === "0") {
            newInt = "0"
        } else {
            newInt = int;
        }

        resultNum = newInt + "." + dec;

        if (type === "exp") {
            resultNum = "- " + resultNum;
        } else if (type === "inc") {
            resultNum = "+ " + resultNum;
        }

        return resultNum;

    }

    function renderListItem(obj, type){
        let containerElement, html;
        if(type === "inc"){
            containerElement = DOMstrings.incomeContainer;
            html = `<li id="inc-%id%" class="budget-list__item item item--income">
            <div class="item__title">%description%</div>
            <div class="item__right">
                <div class="item__amount">%value%</div>
                <button class="item__remove">
                    <img src="./img/circle-green.svg" alt="delete" />
                </button>
            </div>
        </li>`
        } else {
            containerElement = DOMstrings.expenseContainer;
            html = `<li id="exp-%id%" class="budget-list__item item item--expense">
            <div class="item__title">%description%</div>
            <div class="item__right">
                <div class="item__amount">
                    %value%
                    <div class="item__badge">
                        <div class="item__percent badge badge--dark">
                            15%
                        </div>
                    </div>
                </div>
                <button class="item__remove">
                    <img src="./img/circle-red.svg" alt="delete" />
                </button>
            </div>
        </li>`
        }

        let newHtml = html.replace("%id%", obj.id);
        newHtml = newHtml.replace("%description%", obj.description);
        newHtml = newHtml.replace("%value%", formatNumber(obj.value, "type"));

        document.querySelector(containerElement).insertAdjacentHTML("beforeend", newHtml);
    }

    function clearFields() {
        let inputDesc, imputVal;

        inputDesc = document.querySelector(DOMstrings.inputDescription);
        imputVal = document.querySelector(DOMstrings.inputValue);

        inputDesc.value = "";
        inputDesc.focus(); // ставим курсор в поле описание
        imputVal.value = "";
    }

    function updateBudget(obj){

        if (obj.budget > 0) {
            type = "inc"
        } else {
            type = "exp"
        }

        document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
        document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, "inc");
        document.querySelector(DOMstrings.expesesLabel).textContent = formatNumber(obj.totalExp, "exp");
        
        if (obj.percentage > 0){
            document.querySelector(DOMstrings.expencePercentLabel).textContent = obj.percentage;
        } else {
            document.querySelector(DOMstrings.expencePercentLabel).textContent = "-";
        }
        
    }

    function deleteListItem(itemID){
        document.getElementById(itemID).remove();
    }

    function updateItemPercets(items){

        items.forEach(function(item){
            let el = document.getElementById(`exp-${item[0]}`).querySelector('.item__percent');
            // console.log("🚀 items.foreEach ~ el:", el);

            if(item[1] >= 0) {
                el.parentElement.style.display = "block";
                el.textContent = item[1] + " %";
            } else {
                el.parentElement.style.display = "none";
            }
         })
         
    }

    function displayMonth(){
        let now, year, month;

        now = new Date();
        year = now.getFullYear();
        month = now.getMonth();

        monthArr = [
            'Январь', 
            'Февраль', 
            'Март', 
            'Апрель', 
            'Май', 
            'Июнь', 
            'Июль', 
            'Август', 
            'Сентябрь', 
            'Октябрь', 
            'Ноябрь', 
            'Декабрь', 
        ];

        month = monthArr[month];

        document.querySelector(DOMstrings.monthLabel).innerText = month;
        document.querySelector(DOMstrings.yearLabel).innerText = year;

    }

    return {
        getInput: getInput,
        renderListItem: renderListItem,
        clearFields: clearFields,
        updateBudget: updateBudget,
        deleteListItem: deleteListItem,
        updateItemPercets:updateItemPercets,
        displayMonth: displayMonth,
        getDomStrings: function () {
            return DOMstrings
        }
    }
})();