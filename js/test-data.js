let tests = (function(){

    let ExampleItem = function(type, desc, sum){
        this.type = type;
        this.desc = desc;
        this.sum = sum;
        };


    let testData = [
        new ExampleItem("inc", "Salary", 55506),
        new ExampleItem("inc", "Freelance", 120400),
        new ExampleItem("inc", "Partner Programm", 11506),
        new ExampleItem("inc", "Sales", 50506),
        new ExampleItem("exp", "Rent", 21306),
        new ExampleItem("exp", "Entertainments", 12200),
        new ExampleItem("exp", "Purchases", 15506),
        new ExampleItem("exp", "Fuel", 10506)
    ];


    function getRandoNum(max){
        return Math.floor(Math.random() * max);
    }

    function insertInUI(){
        let random = getRandoNum(testData.length);
        let randomItem = testData[random];        

        document.querySelector("#input__type").value = randomItem.type;
        document.querySelector("#input__description").value = randomItem.desc;
        document.querySelector("#input__value").value = randomItem.sum;
    }

    return {
        init: insertInUI,
    }


})();

tests.init();