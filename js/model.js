let modelController = (function(){

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    function addItem (type, desc, val){
        let newItem;
        let ID = 0;
        
        // генерируем ID
        if(data.allItems[type].length > 0){
            ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        } else {
            ID = 0;
        }
        // в зависимости от пипа используем соответствующий конструктор и создаем объект
        if(type === "inc"){
            newItem = new Income(ID, desc, parseFloat(val));
        } else if (type === "exp"){
            newItem = new Expense(ID, desc, parseFloat(val));
        }

        data.allItems[type].push(newItem)

        return newItem
    }

    function calculateTotalSum(type){
        let sum = 0;
        data.allItems[type].forEach(function(item){
            sum = sum + item.value;
        });
        return sum;
    }
    
    function calculateBudget(){
        data.totals.inc = calculateTotalSum("inc");

        data.totals.exp = calculateTotalSum("exp");
        
        // расчет общего бюджета
        data.budget = data.totals.inc - data.totals.exp;
        
// ---------------- расчет процента расходов-------------------------------------

        if (data.totals.inc > 0){
             data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
        } else {
            data.percentage = -1;
        }
    }

    function getBudget(){
        return {
            budget : data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            percentage: data.percentage,
        }
    }

    let data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
        budget: 0,
        percentage: -1
    }
    
    return {
        addItem: addItem,
        getBudget: getBudget,
        calculateBudget:calculateBudget,
        test: function(){
            }
    }



})();