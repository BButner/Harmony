import useSWR from 'swr'

function useSharedState (key, initial) {
  const { data: state, mutate: setState } = useSWR(key, {
    initialData: initial
  })

  return [state, setState]
}

export default useSharedState
