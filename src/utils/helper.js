 const formatDate = (dateString) => {
    // Split the date string into parts
    const [month, day, year] = dateString.split('/').map(Number);
  
    // Create a Date object with the parsed parts
    const date = new Date(year, month - 1, day); // month is 0-based in JavaScript Date
  
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date string');
    }
  
    // Define formatting options
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
  
    // Format the date and replace spaces with non-breaking spaces
    return date.toLocaleDateString('en-GB', options).replace(/ /g, ' ');
  };

  const convertDateFormat = (dateStr) => {
    // '08/05/2024' : -> '2024-08-05'
    const [month, day, year] = dateStr.split('/');
  
    // Format the date string as 'YYYY-MM-DD'
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };

    const getDaysByWeek = (startDate, endDate, daysPerWeek) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
    
      // Ensure startDate is before endDate
      if (start > end) {
        throw new Error("startDate must be before endDate");
      }
    
      const weeks = [];
      let currentWeek = [];
      let currentDate = new Date(start);
    
      // Adjust currentDate to start from the startDate and iterate till endDate
      while (currentDate <= end) {
        currentWeek.push({ date: currentDate.toISOString().split('T')[0], completed: false });
    
        // Check if the current date is the end of the week (Sunday) or it's the last day in the range
        if (currentDate.getDay() === 0 || currentDate.getTime() === end.getTime()) {
          weeks.push(currentWeek.slice(0, daysPerWeek));
          currentWeek = [];
        }
    
        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
      }
    
      // Add the remaining days in the last week if any
      if (currentWeek.length > 0) {
        weeks.push(currentWeek.slice(0, daysPerWeek));
      }
    
      return weeks;
    };

    const formatCreateDate = (date) => {
      if (!date) return "Select Date";
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    };
  

    function capitalizeFirstLetter(str) {
      return str
        .toLowerCase() // Convert the entire string to lowercase
        .split(' ') // Split the string into an array of words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
        .join(' '); // Join the array back into a single string
    }

    const formatDateString = (dateString) => {
      if (!dateString) return ""; // Handle null or undefined dateString
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return ""; // Handle invalid date strings
  
      const options = { day: 'numeric', month: 'short' };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      const parts = formatter.formatToParts(date);
      const month = parts.find(part => part.type === 'month').value;
      const day = parts.find(part => part.type === 'day').value;
      const dayWithSuffix = getDayWithSuffix(day);
      return `${month} ${dayWithSuffix}`;
    };
  
    const getDayWithSuffix = (day) => {
      if (day === '11' || day === '12' || day === '13') {
        return `${day}th`;
      }
      const lastDigit = day.slice(-1);
      switch (lastDigit) {
        case '1':
          return `${day}st`;
        case '2':
          return `${day}nd`;
        case '3':
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    };
  
  export { formatDate , convertDateFormat  ,  getDaysByWeek , formatCreateDate , capitalizeFirstLetter , formatDateString}