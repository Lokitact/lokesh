function doPost(e) {
  try {
    const messages = JSON.parse(e.parameter.messages);
const apiKey = PropertiesService.getScriptProperties().getProperty("OPENROUTER_API_KEY");

    const openRouterResponse = UrlFetchApp.fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "post",
      contentType: "application/json",
      headers: {
        Authorization: `Bearer ${apiKey}`, // replace with your key
      },
      payload: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: messages,
      }),
      muteHttpExceptions: true,
    });

    return ContentService.createTextOutput(openRouterResponse.getContentText())
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
