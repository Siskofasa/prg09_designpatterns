/// <reference path='sizeProperties.ts'/>

abstract class Treat {
    protected color;
    protected points;
    private location;
    private alreadySet :  boolean;
    public size = 1;

    public constructor(x_cord : number, y_cord : number)  //Is public vanwege de factory
    {
        this.location = {x : x_cord, y : y_cord};
        this.alreadySet = false;
    }

    public getLocation(){
        return this.location;
    }
}

class Apple extends Treat{
    protected points = 5;
    protected color = "green";
}

class Lemon extends Treat {
    protected points = 3;
    protected color = "yellow";
}

class Orange extends Treat {
    protected points = 2;
    protected color = "orange";
}

class Berry extends Treat {
    protected points = 1;
    protected color = "blue";
}

class Cherry extends Treat {
    protected points = 8;
    protected color = "red";
}