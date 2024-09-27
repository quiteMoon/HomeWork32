export const signIn = (values) => (dispatch) => {
    const json = JSON.stringify(values);
    localStorage.setItem("auth", json);

    const email = values.email;
    dispatch({ type: "SIGN_IN", payload: email });
};

export const loginByLocalStorage = () => (dispatch) => {
    const auth = localStorage.getItem("auth");
    if (auth != null) {
        const user = JSON.parse(auth);
        dispatch({ type: "SIGN_IN", payload: user.email });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("auth");
    dispatch({ type: "LOGOUT" });
};
