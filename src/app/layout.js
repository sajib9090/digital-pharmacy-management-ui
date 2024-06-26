import Nav from "./Components/Nav/Nav";
import Sidebar from "./Components/Sidebar/Sidebar";
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-[80rem] mx-auto flex">
          <div>
            <Sidebar />
          </div>
          <div className="container1">
            <div>
              <Nav />
            </div>
            <div>{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
