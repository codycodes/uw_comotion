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
  var SCORE_COL = 1;
  var FIRST_NAME_COL = 28;
  var EMAIL_ADDRESS_COL = 30;
  var UW_AFFIL_COL = 32;
  var IS_PASSED_COL = 33;
  var IS_EMAILED_COL = 34;

  for (var current_row = 0; current_row < data.length - 1; current_row++) {
   var row = data[current_row];
   var emailAddress = row[EMAIL_ADDRESS_COL].trim();
   var firstName = row[FIRST_NAME_COL].trim();
   var uw_affiliation = row[UW_AFFIL_COL];
   var is_passed = row[SCORE_COL]/26 >= 0.8 // 80 percent passing score
   var is_emailed =  row[IS_EMAILED_COL];

   // Col vars count at 0 while row vars count at 1
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
       var user_agree_link = "";
       // following links are removed for obvious security reasons
       var uw_link = "";
       var public_link = "";
       // determines which user agreement link is sent
       switch (uw_affiliation) {
         case "UW matriculated student (Seattle campus), faculty, or staff":
           user_agree_link = uw_link;
           break;
         case "UW affiliated: CoMotion Lab startup, Alumni, Professional & Continuing Education, Access Student":
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
        "\nWe encourage you to try again!\nHere's a link to retake the quiz: \n\n" +
          "Good luck!\n\n\nMakerSpace Team";
     }
     try {
     MailApp.sendEmail(emailAddress, subject, message)
     sheet.getRange(current_range_row, current_range_is_emailed_col).setValue("true");
     } catch (e) {
       sheet.getRange(current_range_row, current_range_is_emailed_col).setValue("false");
       var alertEmailAddress = ""
       MailApp.sendEmail(alertEmailAddress, firstName + ' w/email "' + emailAddress + '" not emailed after taking safety quiz', 'please check row ' + current_range_row + ' in safety quiz spreadsheet for details');
     }
    }
  }
}
