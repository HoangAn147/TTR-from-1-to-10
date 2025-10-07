export function useToast() {
  return {
    success: (msg) => alert(msg),
    error:   (msg) => alert(msg)
  }
}
