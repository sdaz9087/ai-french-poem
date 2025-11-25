function displayPoem(response) {
  const poemElement = document.querySelector("#poem");

 
  let html = response.data.answer;

  
  const signatureMatch = html.match(/<strong>[\s\S]*<\/strong>\s*$/i);
  const signatureHtml = signatureMatch ? signatureMatch[0] : "";


  let poemText = html
    .replace(/<strong>[\s\S]*<\/strong>\s*$/i, "") // حذف امضا
    .replace(/<br\s*\/?>/gi, "\n"); // تبدیل <br/> به newline

  
  poemElement.style.whiteSpace = "pre-wrap";
  poemElement.innerHTML = ""; // پاک کردن محتوا قبل از تایپ

 
  const tw = new Typewriter(poemElement, {
    autoStart: false,
    delay: 20,
    cursor: "",
  });

  tw.typeString(poemText)
    .callFunction(() => {
     
      if (signatureHtml) {
        poemElement.innerHTML += `\n\n${signatureHtml}`;
      }
    })
    .start();
}

function generatePoem(event) {
  event.preventDefault();

  let instructionsInput = document.querySelector("#user-instructions");
  let apiKey = "tf34c02900bd1c4o2a013feea2a9c3e5";

  let context =
    "You are a romantic Poem expert and love to write short poems. Your mission is to generate a 4 line poem in basic HTML and separate each line with a <br />. Make sure to follow the user instructions. Do not include a title to the poem. Sign the poem with 'SheCodes AI' inside a <strong> element at the end of the poem and NOT at the beginning.";

  let prompt = `User instructions: Generate a French poem about ${instructionsInput.value}`;
  let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let poemElement = document.querySelector("#poem");
  poemElement.classList.remove("hidden");
  poemElement.innerHTML = `<div class="generating">⏳ Generating a French poem about ${instructionsInput.value}</div>`;

  axios.get(apiURL).then(displayPoem);
}

let poemFormElement = document.querySelector("#poem-generator-form");
poemFormElement.addEventListener("submit", generatePoem);
