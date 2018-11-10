export default function getListItemButtonText(): string {
  let buttonText = "List Item";
  const language = document.getElementsByTagName("html")[0].lang;

  switch (language) {
    case "fr":
      buttonText = "Lister élément";
      break;
    case "it":
      buttonText = "Metti all'asta";
      break;
  }

  return buttonText;
}