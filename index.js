function validateAge(oldEnough){
  if (oldEnough) {
    return "old enough";
  } else {
    return "not old enough";
}
}
console.log(validateAge(true)); 
console.log(validateAge(false));
console.log(validateAge(5 > 10)); 
console.log(validateAge(10 > 5));