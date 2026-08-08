import React, { createContext, useContext, useState, useEffect } from "react";

const CouponContext = createContext();

export const CouponProvider = ({ children }) => {
  const [coupons, setCoupons] = useState(() => {
    const savedCoupons = localStorage.getItem("coupons");
    return savedCoupons ? JSON.parse(savedCoupons) : [];
  });

  const [couponUsage, setCouponUsage] = useState(() => {
    const savedUsage = localStorage.getItem("couponUsage");
    return savedUsage ? JSON.parse(savedUsage) : [];
  });

  useEffect(() => {
    localStorage.setItem("coupons", JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem("couponUsage", JSON.stringify(couponUsage));
  }, [couponUsage]);

  const addCoupon = (couponData) => {
    const newCoupon = {
      id: Date.now(),
      ...couponData,
      isActive: true,
      usageCount: 0,
      createdAt: new Date().toISOString(),
    };
    setCoupons([...coupons, newCoupon]);
  };

  const editCoupon = (id, couponData) => {
    setCoupons(coupons.map(coupon => coupon.id === id ? { ...coupon, ...couponData } : coupon));
  };

  const deleteCoupon = (id) => {
    setCoupons(coupons.filter(coupon => coupon.id !== id));
  };

  const applyCoupon = (code, userId) => {
    const coupon = coupons.find(c => c.code === code && c.isActive);
    if (!coupon) return { success: false, message: "Invalid coupon code" };
    
    if (new Date(coupon.expiryDate) < new Date()) {
      return { success: false, message: "Coupon has expired" };
    }

    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
      return { success: false, message: "Coupon usage limit reached" };
    }

    const userUsage = couponUsage.filter(u => u.couponId === coupon.id && u.userId === userId);
    if (coupon.perUserLimit && userUsage.length >= coupon.perUserLimit) {
      return { success: false, message: "You have reached the usage limit for this coupon" };
    }

    setCoupons(coupons.map(c => c.id === coupon.id ? { ...c, usageCount: c.usageCount + 1 } : c));
    
    const newUsage = {
      id: Date.now(),
      couponId: coupon.id,
      userId,
      usedAt: new Date().toISOString(),
    };
    setCouponUsage([...couponUsage, newUsage]);

    return { success: true, coupon };
  };

  const getCouponById = (id) => coupons.find(coupon => coupon.id === id);
  const getCouponByCode = (code) => coupons.find(coupon => coupon.code === code);

  const totalCoupons = coupons.length;
  const activeCoupons = coupons.filter(c => c.isActive).length;
  const expiredCoupons = coupons.filter(c => new Date(c.expiryDate) < new Date()).length;

  return (
    <CouponContext.Provider
      value={{
        coupons,
        couponUsage,
        addCoupon,
        editCoupon,
        deleteCoupon,
        applyCoupon,
        getCouponById,
        getCouponByCode,
        totalCoupons,
        activeCoupons,
        expiredCoupons,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};

export const useCoupons = () => {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error("useCoupons must be used within CouponProvider");
  }
  return context;
};
