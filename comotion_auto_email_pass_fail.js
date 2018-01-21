function sendEmails() {
  // clear the logger to remove previous logs
  Logger.clear();

  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2; // Start at second row because first row contains the data labels
  var endRow = sheet.getLastRow(); // number of rows you want to process

  // These can be changed to determine where you want to start looping  
  var startCol = 1;
  var endCol = sheet.getLastColumn();

  var data = sheet.getRange(startRow, startCol, endRow, endCol).getValues()
  
  //CONSTANTS FOR COLUMNS
  
  var EMAIL_ADDRESS_COL = 33;
  var FIRST_NAME_COL = 31; 
  var UW_AFFIL_COL = 35;
  var IS_PASSED_COL = 43;
  var IS_EMAILED_COL = 44; 
  var SCORE_COL = 1;
  
  for (var current_row = 0; current_row < data.length - 1; current_row++) {
   var row = data[current_row];
   var emailAddress = row[EMAIL_ADDRESS_COL].trim();
   var firstName = row[FIRST_NAME_COL].trim();
   var uw_affiliation = row[UW_AFFIL_COL];
   Logger.log(uw_affiliation)
   var is_passed = row[SCORE_COL]/30 >= 0.8 // 80 percent passing score
   var is_emailed =  row[IS_EMAILED_COL];
    
  // PART OF THESE Variables DEAL WITH COUNTING AT 0, AND PART OF THEM DEAL WITH COUNTING AT 1. SOLUTION?
  // Set variables below to prevent psychosis.
  
  var current_range_row = current_row + 2;
  var current_range_is_passed_col = IS_PASSED_COL + 1;
  var current_range_is_emailed_col = IS_EMAILED_COL + 1;
   
  var is_passed_cell = sheet.getRange(current_range_row, current_range_is_passed_col);
   
   // if there's nothing in the is_passed cell, then store if they passed or not in the is_passed cell
   if (is_passed_cell.getValue() == "") {
     is_passed_cell.setValue(is_passed);
   }
  
   
   if (!is_emailed) {
     var subject = "Your CoMotion MakerSpace quiz results:"; 
     if (is_passed) {
       var user_agree_link = "hello, world";
       var student_link = "";
       var public_link = "";
       // determine what user agreement is sent
       switch (uw_affiliation) {
         case "UW matriculated student (Seattle campus)":
           user_agree_link = student_link;
           break;
         case "UW faculty or staff":
           user_agree_link = student_link;
           break;
         case "CoMotion Labs Startups":
           user_agree_link = public_link;
           break;
         case "UW Professional & Continuing Education Student":
           user_agree_link = public_link;
           break;
         case "Access Student":
           user_agree_link = public_link;
           break;
         case "Retired faculty/staff":
           user_agree_link = public_link;
           break;
         case "Alumni":
           user_agree_link = public_link;
           break;
         case "WNF Users":
           user_agree_link = public_link;
           break;
         case "General Public":
           user_agree_link = public_link;
           break;
         default:
           user_agree_link = "";
       }
      // Assemble the body text
      var message = "Hi " + firstName + ",\n\nCongratulations! You successfully passed the MakerSpace Safety Quiz!\n" + 
        "Your next step is to fill out a User Agreement:\n" + user_agree_link + "\n\nHappy making!\n\n\nMakerSpace Team"; 
     } else {
      var message = "Hi " + firstName + ",\n\nUnfortunately, you didn't pass the MakerSpace Safety Quiz." + 
        "\nWe encourage you to try again!\nHere's a link to retake the quiz: https://goo.gl/NYueHN\n\n" + 
          "Good luck!\n\n\nMakerSpace Team";
     }
     try {
     MailApp.sendEmail(emailAddress, subject, message)
     sheet.getRange(current_range_row, current_range_is_emailed_col).setValue("true");
     } catch (e) {
       sheet.getRange(current_range_row, current_range_is_emailed_col).setValue("false");
     }
    }
   SpreadsheetApp.flush();
  }
  var emailQuotaRemaining = MailApp.getRemainingDailyQuota();
  Logger.log("Remaining email quota: " + emailQuotaRemaining);
 
}