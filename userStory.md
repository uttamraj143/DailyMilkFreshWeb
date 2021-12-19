<!-- add email login validation and phone number validation -->

https://medium.com/@subalerts/creating-protected-routes-in-react-js-89e95974a822
https://cdn.dribbble.com/users/420440/videos/12419/add_booking.mp4
https://dummyapi.io/data/v1/user?page=1&limit=10
https://www.savaslabs.com/blog/using-react-global-state-hooks-and-context
https://medium.com/@akrush95/global-cached-state-in-react-using-hooks-context-and-local-storage-166eacf8ab46
https://egghead.io/lessons/react-share-logic-across-multiple-react-components-with-custom-hooks
https://www.codegrepper.com/code-examples/javascript/pass+context+from+one+file+to+another+reactjs

npx npm-check-updates -u

1. Customer should have their monthly calendar, in that they can select milk and products
2. Customer order details be mailed/messaged/notification
3. Order details should be updated in DB
4. This order should be assigned to Respective Agent/delivery boy & (delivery boy can update quantity)
5. Per customer can download their monthly bills (in excel)
6. Rates, payment need not implement
7. There is existing Milk management in wordpress, check implementation

History
remove deliveries page -
Sort according to Date and fetch only with Date
animations transitions

cancel order

export default function App() {
return (
<AuthProvider>
<Routes>
<Route element={<Layout />}>
<Route path="/" element={<PublicPage />} />
<Route path="/public" element={<PublicPage />} />
<Route path="/login" element={<LoginPage />} />
<Route element={<RequireAuth />}>
<Route path="/protected" element={<ProtectedPage />} />
<Route path="/dashboard" element={<Dashboard />} />
</Route>
</Route>
<Route path="\*" element={<NotFound />} />
</Routes>
</AuthProvider>
);
}
function RequireAuth() {
let auth = useAuth();
let location = useLocation();

if (!auth.user) {
// Redirect them to the /login page, but save the current location they were
// trying to go to when they were redirected. This allows us to send them
// along to that page after they login, which is a nicer user experience
// than dropping them off on the home page.
return <Navigate to="/login" state={{ from: location }} />;
}

return <Outlet />;
}
