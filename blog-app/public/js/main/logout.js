class Logout {
    async logoutProfile (e)  {
        e.preventDefault();
        await fetch('/users/logout', {
            method: 'post',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        })
        document.location.reload();
    }
}

const logout = new Logout();