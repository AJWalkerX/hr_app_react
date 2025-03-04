import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminHomePage from "./pages/AdminHomePage";
import AdminCustomersPage from "./pages/AdminCustomersPage";
import AdminWaitCustomersPage from "./pages/AdminWaitCustomersPage";
import SetNewPasswordPage from "./pages/SetNewPasswordPage";
import { hrDispatch, hrUseSelector } from "./stores";
import { useDispatch } from "react-redux";
import {
  adminLogin,
  adminLogout,
  fetchAdminLogin,
} from "./stores/features/adminAuthSlice";
import UserInformationPage from "./pages/UserInformationPage";
import UserProfileSettingsPage from "./pages/UserProfileSettingsPage";
import ManagerHomePage from "./pages/ManagerHomePage";
import UserPermitPage from "./pages/UserPermitPage";
import ManagerEmployeesPage from "./pages/ManagerEmployeesPage";
import PermitRequestPage from "./pages/PermitRequestPage";
import PersonelHomePage from "./pages/PersonelHomePage";
import PermitRequestManagerPage from "./pages/PermitRequestPageManager";
import ManagerProfileSettingsPage from "./pages/ManagerProfileSettingsPage";
import UserPermitViewPage from "./pages/UserPermitViewPage";
import ManagerPermitView from "./pages/ManagerPermitViewPage";
import ManagerPermitViewPage from "./pages/ManagerPermitViewPage";
import ManagerCommentPage from "./pages/ManagerCommentPage";
import PersonalShiftListPage from "./pages/PersonalShiftListPage";

import AddSpendingPage from "./pages/AddSpendingPage";
import PersonalViewYourPermitPage from "./pages/PersonalViewYourPermitPage";
import CommentListPage from "./pages/CommentListPage";
import EmployeeDetailsPage from "./pages/EmployeeDetailsPage";
import PersonalViewAllMySpendingPage from "./pages/PersonalViewAllMySpendingPage";
import CommentDetailsPage from "./pages/CommentDetailsPage";
import ManagerSpendingViewPage from "./pages/ManagerSpendingViewPage";
import ShiftManagerPage from "./pages/ShiftManagerPage";
import ManagerEmbezzlementPage from "./pages/ManagerEmbezzlementPage";
import ShiftAssignmentPage from "./pages/ShiftAssignmentPage";
import PersonalViewAllMyEmbezzlementPage from "./pages/PersonalViewAllMyEmbezzlementPage";
import { Login } from "@mui/icons-material";
import NotFoundPage from "./pages/NotFoundPage";
import { login, logout } from "./stores/features/authSlice";

function RouterPage() {
  const dispatch = useDispatch<hrDispatch>();
  const navigate = useNavigate();
  const isAdminLogin = hrUseSelector((state) => state.adminAuth.isAdminAuth);
  console.log("isAdminLogin: ", isAdminLogin);
  const isAuth = hrUseSelector((state) => state.auth.isAuth);
  console.log("isAuth: ", isAuth);
  const isFirstLogin = hrUseSelector(
    (state) => state.auth.loginResponse?.position === "MANAGER"
  );

  useEffect(() => {
    const managerToken = localStorage.getItem("token");
    const employeeToken = localStorage.getItem("token");

    if (managerToken || employeeToken) {
      dispatch(login());
    } else if (!employeeToken) {
      dispatch(logout());
    }
    if (isFirstLogin) {
      navigate("/user-information");
    }
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      dispatch(adminLogin());
    } else {
      dispatch(adminLogout());
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/admin"
        element={isAdminLogin ? <AdminHomePage /> : <AdminLoginPage />}
      />
      <Route path="/admin-login" element={<AdminLoginPage />} />
      <Route
        path="/admin/customers"
        element={isAdminLogin ? <AdminCustomersPage /> : <NotFoundPage />}
      />
      <Route
        path="/admin/wait-customers"
        element={isAdminLogin ? <AdminWaitCustomersPage /> : <NotFoundPage />}
      />
      <Route
        path="/user-information"
        element={isAuth ? <UserInformationPage /> : <LoginPage />}
      />
      <Route
        path="/personal/profile"
        element={isAuth ? <UserProfileSettingsPage /> : <NotFoundPage />}
      />
      <Route
        path="/manager"
        element={isAuth ? <ManagerHomePage /> : <LoginPage />}
      />
      <Route
        path="/manager/permit"
        element={isAuth ? <UserPermitPage /> : <NotFoundPage />}
      />
      <Route
        path="/manager/employees"
        element={isAuth ? <ManagerEmployeesPage /> : <NotFoundPage />}
      />

      <Route path="/set-new-password" element={<SetNewPasswordPage />}></Route>
      <Route
        path="/personal/permit-request"
        element={isAuth ? <PermitRequestPage /> : <NotFoundPage />}
      >
        {" "}
      </Route>
      <Route
        path="/personal"
        element={isAuth ? <PersonelHomePage /> : <LoginPage />}
      ></Route>
      <Route
        path="/manager/permit-request"
        element={isAuth ? <PermitRequestManagerPage /> : <NotFoundPage />}
      >
        {" "}
      </Route>
      <Route
        path="/manager/profile"
        element={isAuth ? <ManagerProfileSettingsPage /> : <NotFoundPage />}
      />
      <Route
        path="/personal/view-your-permit"
        element={isAuth ? <PersonalViewYourPermitPage /> : <NotFoundPage />}
      ></Route>
      <Route
        path="/manager/view-manager-permit"
        element={isAuth ? <ManagerPermitViewPage /> : <NotFoundPage />}
      ></Route>
      <Route
        path="/manager/comment"
        element={isAuth ? <ManagerCommentPage /> : <NotFoundPage />}
      ></Route>
      <Route path="/comment/list" element={<CommentListPage />} />
      <Route
        path="/personal/add-spending"
        element={isAuth ? <AddSpendingPage /> : <NotFoundPage />}
      ></Route>
      <Route path="/employee-details" element={<EmployeeDetailsPage />}></Route>
      <Route
        path="/personal/view-my-spending"
        element={isAuth ? <PersonalViewAllMySpendingPage /> : <NotFoundPage />}
      ></Route>
      <Route
        path="/manager/employees/spending-list"
        element={isAuth ? <ManagerSpendingViewPage /> : <NotFoundPage />}
      ></Route>
      <Route
        path="/comment/comment-details/:commentId"
        element={<CommentDetailsPage />}
      ></Route>
      <Route
        path="/manager/shift-request"
        element={isAuth ? <ShiftManagerPage /> : <NotFoundPage />}
      ></Route>
      <Route
        path="/manager/embezzlement"
        element={isAuth ? <ManagerEmbezzlementPage /> : <NotFoundPage />}
      ></Route>
      <Route
        path="/manager/shift-assignment"
        element={isAuth ? <ShiftAssignmentPage /> : <NotFoundPage />}
      ></Route>
      <Route
        path="/personal/view-my-embezzlement"
        element={
          isAuth ? <PersonalViewAllMyEmbezzlementPage /> : <NotFoundPage />
        }
      ></Route>
      <Route
        path="/personal/shift-list"
        element={isAuth ? <PersonalShiftListPage /> : <NotFoundPage />}
      ></Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RouterPage />
    </BrowserRouter>
  );
}
