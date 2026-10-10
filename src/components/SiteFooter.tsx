import { cacheLife } from "next/cache";

async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function SiteFooter({ name }: { name: string }) {
  const year = await currentYear();
  return (
    <footer className="container site-footer">
      <div>
        © {year} {name}
      </div>
      <div className="site-footer__links">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
      </div>
    </footer>
  );
}
