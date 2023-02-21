let tests = (function(){

    console.log("hello")

    let ExampleItem = function(type, desc, sum){
        this.type = type;
        this.desc = desc;
        this.sum = sum;
        };


    let testData = [
        new ExampleItem("inc", "Salary", 30506),
        new ExampleItem("inc", "Freelance", 12400),
        new ExampleItem("inc", "Partner Programm", 30506),
        new ExampleItem("inc", "Sales", 30506),
        new ExampleItem("exp", "Rent", 30506),
        new ExampleItem("exp", "Entertainments", 12200),
        new ExampleItem("exp", "Purchases", 30506),
        new ExampleItem("exp", "Fuel", 30506)
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