
export const copyToClipboard = async (
  text,
  successfulMessage = 'copied_to_clipboard',
) => {
  if (!text) {
    return;
  }
  try {
    await window.navigator.clipboard.writeText(text);
    console.log(successfulMessage);
  } catch (e) {
    console.error('copy_to_clipboard_failed')
  }
};
