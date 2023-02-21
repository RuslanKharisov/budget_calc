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
            newItem = new Income(ID, desc, val);
        } else if (type === "exp"){
            newItem = new Expense(ID, desc, val);
        }

        data.allItems[type].push(newItem)

        return newItem
    }

    let data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        }        
    }
    return {
        addItem: addItem,
        test: function(){
            console.log(data)
        }
    }



})();