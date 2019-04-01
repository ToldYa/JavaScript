
/*
authors: Emil Vesa - emil.vesa@gmail.com, Aboud Malki - aboud-malki@hotmail.com
*/

function MyObject(){};

MyObject.prototype.addPrototype = function(obj){
  circular = false;
  if(obj != null && obj.prototypeList != null){
    for(i = 0; i < obj.prototypeList.length; i++){
      if(obj.prototypeList[i] == this){
        circular = true;
      }
    }
  }
  if(!circular && obj != null){
    this.prototypeList.push(obj);
    console.log("Successfully added prototype");
  }else{
    console.log("Error with adding prototype");
  }
};

MyObject.prototype.create = function(protoList){
  newObj = {
    prototypeList : [],
    func : null
  };
  newObj.__proto__ = MyObject.prototype;

  if(protoList != null ){
    for (i = 0; i < protoList.length; i++) {
      newObj.prototypeList.push(protoList[i]);
    }
  }else{
    newObj.prototypeList.push(Object);
  }
  return newObj;
};

MyObject.prototype.call = function(funcName, parameters){
  result = null;
  found = false;

  if(funcName != null && this.func != null && this.func.name == funcName){
    result = this.func(parameters);
    found = true;
  }
  if(!found){
    for(i = 0; i < this.prototypeList.length; i++){
      temp = this.prototypeList[i];
      result = temp.call(funcName, parameters);
      if(result != null){
        i = this.prototypeList.length;
        found = true;
      }
    }
  }

  return result;
};

var myObject = Object.create(MyObject.prototype);

// Test för prototyp baserat
obj0 = myObject.create(null);
obj0.func = function protoBasedTestFunc(arg) { return "protoBasedTestFunc: " + arg; };
obj1 = myObject.create([obj0]);
obj2 = myObject.create([]);
obj3 = myObject.create([obj2, obj1]);
obj3.prototype = MyObject.prototype;
result = obj3.call("protoBasedTestFunc", ["hello"]);
console.log("prototype inheritance:");
console.log("'obj3.call()' should print 'protoBasedTestFunc: hello' ->", result);
// Test för circular prevention
console.log("Prototype based Circular inheritance:");
var obj5 = myObject.create(null);
var obj6 = myObject.create([obj5]);
obj5.addPrototype(obj6);
