let modelController = (function(){

    let Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    let Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }

    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome > 0){
            this.percentage = Math.round(this.value/totalIncome*100);
        } else {
            this.percentage = -1;
        }
    }

    Expense.prototype.getPercentage = function(){
        return this.percentage;
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

    function deletItem (type, id){
        let index;
        // создаем массив id записей взависимости от типа 
        let ids = data.allItems[type].map(function(item){
            return item.id
        });
        console.log("🚀 ~ file: model.js:43 ~ ids ~ ids:", ids)

        // определяем индекс записи в массиве по id 
        index = ids.indexOf(id);
        console.log("🚀 ~ file: model.js:46 ~ deletItem ~ index:", index)

        if (index !== -1) {
            data.allItems[type].splice(index, 1); // удаляем запись из массива
        }
        

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

    function calculatePercentage(){
        data.allItems.exp.forEach(function(item){
            item.calcPercentage(data.totals.inc);
        })
    }

    function getAllIdsAndPercentage(){
        // [[0, 8], [1, 15], [2, 30]]

        let allPerc = data.allItems.exp.map(function(item){
            return [item.id, item.getPercentage()];
        });

        return allPerc;


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
        deletItem:deletItem,
        calculatePercentage:calculatePercentage,
        getAllIdsAndPercentage:getAllIdsAndPercentage,
        
        test: function(){
            console.log(data)
            }
    }



})();