const useSubscribe = () => {
  return (data: any = {}) => {
    return fetch('/api/subscribe', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        profiles: [data],
      }),
    })
  }
}
export default useSubscribe
