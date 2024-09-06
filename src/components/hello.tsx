type Hello = {
  name?: string
}

export const Hello = ({ name = 'Pere' }: Hello) => {
  return <div>{`hello, ${name}`}</div>
}
