
/*
authors: Emil Vesa - emil.vesa@gmail.com, Aboud Malki - aboud-malki@hotmail.com
*/

function createClass(className, superClasses){
  newClass = {
    name : className,
    superClassList : [],
    func: null,
    addSuperClass : function(classToAdd){
      circular = false;
      if(classToAdd != null && classToAdd.superClassList != null){
        for(i = 0; i < classToAdd.superClassList.length; i++){
          if(classToAdd.superClassList[i] == this){
            circular = true;
          }
        }
      }
      if(!circular && classToAdd != null){
        this.superClassList.push(classToAdd);
        console.log("Successfully added super class");
      }else{
        console.log("Error with adding super class");
      }
    },
    new : function(){
      newObj = {
        sprClasses: this.superClassList,
        func : this.func,
        call : function(funcName, parameters){
          result = null;
          found = false;

          if(funcName != null && this.func != null && this.func.name == funcName){
            result = this.func(parameters);
            found = true;
          }
          if(!found){
            for(i = 0; i < this.sprClasses.length; i++){
              temp = this.sprClasses[i];
              result = temp.call(funcName, parameters);
              if(result != null){
                i = this.sprClasses.length;
                found = true;
              }
            }
          }
          return result;
        } // newObj.call
      } // newObj
      return newObj;
    } // newClass.new
  } // newClass


  if(superClasses != null && superClasses.length > 0){
    for (i = 0; i < superClasses.length; i++) {
      newClass.superClassList.push(superClasses[i]);
    }
  }

   return newClass;
};


//Test för klass baserat
class0 = createClass("Class0", null);
class0.func = function classBasedTestFunc(arg) { return "classBasedTestFunc: " + arg; };
var obj4 = class0.new();
result1 = obj4.call("classBasedTestFunc", ["hello"]);
console.log("class-based inheritance:");
console.log("'obj4.call()' should print 'classBasedTestFunc: hello' ->", result1);

// Test för circular prevention
console.log("Class-based Circular inheritance:");
var class2 = createClass("Class 2", null);
var class3 = createClass("Class 3", [class2]);
class2.addSuperClass(class3);
