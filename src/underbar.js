var _ = {};

(function() {

  // Return an array of the last n elements of an array. If n is undefined,
  // return just the last element.
  _.last = function(array, n) {
    if (arguments.length > 2 || arguments.length < 1 ) {
      return false;
    }
    var newArray = [];

    if (!Array.isArray(array)) {
      for (var i = 0; i<array.length;i++){
        newArray.push(array[i]);
      }
    } else {
      newArray = array;
    }
    if (n == undefined) {
      return newArray.pop();
    } else if (n >= newArray.length) {
      return newArray
    } else {
      var returnArray = [];
      for (var i = 0; i< n; i++) {
        returnArray.unshift(newArray.pop())
      }
      return returnArray;
    }
  };

  // Like last, but for the first elements
  _.first = function(array, n) {

    if (arguments.length > 2 || arguments.length < 1 ) {
      return false;
    }
    var newArray = []


    if (!Array.isArray(array)) {
      for (var i = 0; i<array.length;i++){
        newArray.push(array[i]);
      }
    } else {
      newArray = array;
    }
    // TIP: you can often re-use similar functions in clever ways, like so:


      var finArray = _.last(newArray.reverse(), n);
      if (Array.isArray(finArray)) {
        return finArray.reverse();
      } else {
        return finArray;
      }
      
    
  };


  // Call iterator(value, key, collection) for each element of collection
    _.each = function(obj, iterator) {

      if (Array.isArray(obj)){
        for (var i = 0; i<obj.length; i++) {
          iterator(obj[i],i,obj);
        }
      } else {
        for (var item in obj) {
          iterator(obj[item],item,obj);
        }
      }
      
    };

  /*
   * TIP: Here's an example of a function that needs to iterate, which we've
   * implemented for you. Instead of using a standard `for` loop, though,
   * it uses the iteration helper `each`, which you will need to write.
   */

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        //parseInt from string because for...in loop uses strings as iterators
        result = parseInt(index);
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
      var rtnArray = [];

      _.each(collection, function(item,index){
          if (iterator(item)) {
            rtnArray.push(item);
          }

      });
      return rtnArray;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    // TIP: see if you can re-use _.select() here, without simply
    // copying code in and modifying it

    return _.filter(collection,function(item) {
        return !iterator(item);
    });

  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {

    var rtnArray = [];

    for (var i = 0; i<array.length;i++){
        var contains = -1;
        for (var j = 0; j <= rtnArray.length; j++){
          if (rtnArray[j] == array[i]){
            contains = 1;
          }
        }
        if (contains == -1) {
          rtnArray.push(array[i]);
        }
    }

    return rtnArray;
  };


  /*
   * map() is a useful primitive iteration function that works a lot
   * like each(), but in addition to running the operation on all
   * the members, it also maintains an array of results.
   */

  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {

    var rtnArray = [];

    _.each(array,function(item) {
      rtnArray.push(iterator(item));

    });
    return rtnArray;

  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(obj, propertyName) {
    return _.map(obj, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName) {
    var returnArray = list;
    if (typeof(methodName) == "string"){
      _.each(list,function(item) {
      item[methodName].apply(item);
      });
    return returnArray;
    } else {
      _.each(list,function(item) {
      methodName.apply(item);
      });
    return returnArray;
    }
  
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  _.reduce = function(obj, iterator, initialValue) {

    var result = initialValue || 0;

    _.each(obj, function(item, index, collection) {
      result = iterator(result, item);
    });
    return result;

  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: A lot of iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item){
      if(wasFound){
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(obj, iterator) {
    // TIP: use reduce on this one!
    var result = true;

    result = _.reduce(obj,function(isTrue,item){
      if (!isTrue) {
        return false;
      } else {
        return Boolean(iterator(item));
      }
    },true);

    return result;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.any = function(obj, iterator) {
    // TIP: re-use every() here
    iterator = iterator || function(variable){return Boolean(variable);};
    return !_.every(obj,function(item){
      return !iterator(item);
    });
  };


  /*
   * These are a couple of helpers for merging objects
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  //
  _.extend = function(obj) {

    var rtnObj = obj;

    for (var i = 1; i <= arguments.length; i++){
      for (var attrName in arguments[i]){
        rtnObj[attrName] = arguments[i][attrName];
      }
    }
    return rtnObj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var rtnObj = obj;

    for (var i = 1; i <= arguments.length; i++){
      for (var attrName in arguments[i]){
        if ((rtnObj[attrName]==undefined)) {
          rtnObj[attrName] = arguments[i][attrName];
        }
        
      }
    }
    return rtnObj;

  };


  /*
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a `closure scope` (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {

    var result; 
    var cache = {};


    return function(argument) {
      if(cache.hasOwnProperty(argument)){
        result = cache[argument];
      } else {
        result = func.apply(this,arguments);
        cache[argument] = result;
      }
      return result;
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {

    var argArray = _.last(arguments,arguments.length - 2);

    setTimeout(function(){func.apply(null,argArray)},wait);

  };


  /*
   * Advanced collection operations
   */

  // Shuffle an array.
  _.shuffle = function(obj) {

      var rtn = [];
      for (var i = 0; i<obj.length; i++) {
        rtn[i] = obj[i];
      }

        for (var i = 0; i<rtn.length; i++) {
          var newInd = Math.floor(Math.random()*rtn.length);
          var tmp = rtn[newInd];
            rtn[newInd] = rtn[i];
            rtn[i] = tmp;
        }
      
      return rtn;
  };

  /* (End of pre-course curriculum) */

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3]]
  _.zip = function() {
  };

  // Flattens a multidimensional array to a one-dimensional array that
  // contains all the elements of all the nested arrays.
  //
  // Hints: Use Array.isArray to check if something is an array
  //
  _.flatten = function(nestedArray, result) {
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /*
   * Offroad
   */

  // EXTRA CREDIT:
  // Return an object that responds to chainable function calls for
  // map, pluck, select, etc
  //
  // See README for details
  _.chain = function(obj) {
  };

  // EXTRA CREDIT:
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See README for details
  _.throttle = function(func, wait) {
  };

}).call(this);
