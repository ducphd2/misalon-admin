import React, { Suspense } from "react";
import MainLayout from "../../components/MainLayout";

export const ProfilePage = () => {
  return (
    <Suspense fallback={<></>}>
      <MainLayout
        title="Service"
        titleButton="Thêm dịch vụ"
        // handleClickAdd={handleAddService}
      >
        <div>ProfilePage</div>
      </MainLayout>
    </Suspense>
  );
};

export default ProfilePage;
