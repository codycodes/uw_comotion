<% @ Page Language="C#" %>
<%
foreach (string var in Request.ServerVariables)
{
  if (var == "HTTP_GWSGROUPS") {
      String groups = Request[var];
      if (groups.Contains("uw_comotion_makerspace_quiz")) {
          Response.Write("Welcome, you have access");
      }
  }
}
%>
