export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-text-muted">The page you’re looking for doesn’t exist.</p>
      <a className="btn btn-primary mt-6 inline-block" href="/">Go home</a>
    </main>
  );
}
