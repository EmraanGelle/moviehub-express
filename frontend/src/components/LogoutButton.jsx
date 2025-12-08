export default function LogoutButton() {
  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return <button onClick={handleLogout}>Logout</button>;
}
