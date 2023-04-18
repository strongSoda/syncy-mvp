  // given a date and a number of days, return a new date
  const addDays = (date: string, days: string) => {
    console.log(date);
    
    const result = new Date(date);
    result.setDate(result.getDate() + +days);
    console.log('yoyo', result.toLocaleDateString());
    return result.toLocaleDateString();
    // return result;
  }

  export default addDays;
  