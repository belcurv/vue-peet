/**
 * Exploring memoization
 * 
 * It is like caching, but for functions. So, it's really not useful
 * except for functions that take a long time to complete. Most examples use
 * like fibonacci numbers, etc.
 * 
 * For a given input, cache the result. And on the next receipt of the same
 * imput, return the cached answer instead of re-calculating the result again.
 * 
 * Lodash's own memoize library:
 * https://www.npmjs.com/package/lodash.memoize
 * 
 * Node's performance libbrary
 * https://nodejs.org/api/perf_hooks.html#perf_hooks_performance_timing_api
*/

'use strict'

const { performance } = require('perf_hooks');
const _memoize = require('lodash.memoize')

/**
 * Higher-order function. It
 * 1) takes in a function 'fn'.
 * 2) returns a function, that takes an 'arg'.
 * 3) Closes over a 'cache' of previous answers.
*/
function memoize (fn) {
  // scoped to 'memoize'
  let cache = {}

  // ============== function gets returned ======================
  // return anon function that closes over 'cache'
  return (arg) => {

    // if arg already exists as a 'key' in 'cache' ...
    if (arg in cache) {
      console.log('Using cached answer')
      return cache[arg]
    }
    
    // otherwise ...
    else {
      console.log('Calculating new result')
      // run the passed-in 'fn' with 'arg'
      let result = fn(arg)
      // set cache's key to arg, and that key's value to result
      cache[arg] = result

      // return the result of the calculation
      return result
    }
  }
  // ============== end function gets returned ======================
}

// yup, I get all that.  Except I would have started by making `cache` a global,
// so that it persists.
// it's like the closure keeps `memoize` alive for the duration of the program run.
// exactly.
// remember my love affair with Revealing Module Pattern? CLosures are how you
// can maintain private 'stores' of information within the module, and only
// reveal public methods that interact with those private 'stores' (arrays, etc).


// factorial
function factorial (n) {
  if (n === 1) { return 1 }
  return n * factorial(n - 1)
}

// setup
// const memoizedFactorial = memoize(factorial)  // use our own memoize
const memoizedFactorial = _memoize(factorial)  // use lodash memoize

// reporter
let start = performance.now()
console.log('start', start)
console.log('pre-cached:', memoizedFactorial(100))
let pre_cache = performance.now()
console.log('cached:', memoizedFactorial(100))
let end = performance.now()
console.log('pre-cached', pre_cache - start)
console.log('cached    ', end - pre_cache)

// not bad
// looks like your memoization is competing with some kind of JS optimizer

// wow, I'm missing something here.  how does 70 -> arg?
// how does the cache persist?
// closure baby!
// the returned function maintains a reference to 'cache' in memoize, meaning
// it cannot be garbage collected.
// Except, as soon as Node is done with this script, it's all garbage collected.
// is memoizedFactorial an object?
// memoizedFactorial is assigned (=) the returned function from memoize.
// memoizedFactorial is a function.
// there's some deep shit here.

// memoize(factorial) returns a function, that function is called with (70)
// let bignumber = memoize(factorial)(70)
// console.log(bignumber)
