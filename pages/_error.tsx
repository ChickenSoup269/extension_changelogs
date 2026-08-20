function ErrorPage({ statusCode }: { statusCode?: number }) {
  return (
    <div style={{ textAlign: "center", padding: "40px", fontFamily: "sans-serif" }}>
      <h1>{statusCode ? `${statusCode}` : "Error"}</h1>
      <p>{statusCode ? "An error occurred on server" : "An error occurred on client"}</p>
    </div>
  )
}

ErrorPage.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default ErrorPage
