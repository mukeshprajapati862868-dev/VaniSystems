  import React, {
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";

  const CartContext = createContext();

  export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
      try {
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : [];
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
        return [];
      }
    });

    const [savedForLater, setSavedForLater] = useState(() => {
      try {
        const savedLater = localStorage.getItem("savedForLater");
        return savedLater ? JSON.parse(savedLater) : [];
      } catch (error) {
        console.error("Failed to load saved items from localStorage:", error);
        return [];
      }
    });

    const [appliedCoupon, setAppliedCoupon] = useState(() => {
      try {
        const savedCoupon = localStorage.getItem("appliedCoupon");
        return savedCoupon ? JSON.parse(savedCoupon) : null;
      } catch (error) {
        console.error("Failed to load coupon from localStorage:", error);
        return null;
      }
    });

    useEffect(() => {
      try {
        localStorage.setItem(
          "cartItems",
          JSON.stringify(cartItems)
        );
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error);
        if (error.name === "QuotaExceededError") {
          // Try to free space by removing old data
          const keysToRemove = [];
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key !== "cartItems" && key !== "registeredUsers" && key !== "activeUser") {
              keysToRemove.push(key);
            }
          }
          keysToRemove.forEach(key => localStorage.removeItem(key));
          // Retry saving
          try {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
          } catch (retryError) {
            console.error("Still failed after clearing old data:", retryError);
          }
        }
      }
    }, [cartItems]);

    useEffect(() => {
      try {
        localStorage.setItem("savedForLater", JSON.stringify(savedForLater));
      } catch (error) {
        console.error("Failed to save saved items to localStorage:", error);
        if (error.name === "QuotaExceededError") {
          const keysToRemove = [];
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key !== "savedForLater" && key !== "registeredUsers" && key !== "activeUser") {
              keysToRemove.push(key);
            }
          }
          keysToRemove.forEach(key => localStorage.removeItem(key));
          try {
            localStorage.setItem("savedForLater", JSON.stringify(savedForLater));
          } catch (retryError) {
            console.error("Still failed after clearing old data:", retryError);
          }
        }
      }
    }, [savedForLater]);

    useEffect(() => {
      try {
        localStorage.setItem("appliedCoupon", JSON.stringify(appliedCoupon));
      } catch (error) {
        console.error("Failed to save coupon to localStorage:", error);
        if (error.name === "QuotaExceededError") {
          const keysToRemove = [];
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key !== "appliedCoupon" && key !== "registeredUsers" && key !== "activeUser") {
              keysToRemove.push(key);
            }
          }
          keysToRemove.forEach(key => localStorage.removeItem(key));
          try {
            localStorage.setItem("appliedCoupon", JSON.stringify(appliedCoupon));
          } catch (retryError) {
            console.error("Still failed after clearing old data:", retryError);
          }
        }
      }
    }, [appliedCoupon]);

    const addToCart = (service) => {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find(
          (item) => item.id === service.id
        );

        if (existingItem) {
          return prevItems.map((item) =>
            item.id === service.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          );
        }

        return [
          ...prevItems,
          {
            ...service,
            quantity: 1,
          },
        ];
      });
    };

    const increaseQuantity = (id) => {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    };

    const decreaseQuantity = (id) => {
      setCartItems((prevItems) =>
        prevItems
          .map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
    };

    const removeFromCart = (id) => {
      setCartItems((prevItems) =>
        prevItems.filter(
          (item) => item.id !== id
        )
      );
    };

    const clearCart = () => {
      setCartItems([]);
      setAppliedCoupon(null);
    };

    const saveForLater = (item) => {
      removeFromCart(item.id);
      setSavedForLater([...savedForLater, { ...item, savedAt: new Date().toISOString() }]);
    };

    const moveToCartFromSaved = (item) => {
      setSavedForLater(savedForLater.filter((i) => i.id !== item.id));
      addToCart(item);
    };

    const removeFromSaved = (id) => {
      setSavedForLater(savedForLater.filter((item) => item.id !== id));
    };

    const applyCoupon = (coupon) => {
      setAppliedCoupon(coupon);
    };

    const removeCoupon = () => {
      setAppliedCoupon(null);
    };

    const totalItems = cartItems.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

    const subtotal = cartItems.reduce(
      (total, item) =>
        total +
        (item.discountPrice || item.price) *
          item.quantity,
      0
    );

    const totalGST = cartItems.reduce(
      (total, item) => {
        const gstAmount = item.gstAmount || (item.gst ? Math.round((item.discountPrice || item.price) * item.gst / 100) : 0);
        return total + (gstAmount * item.quantity);
      },
      0
    );

    const totalShipping = cartItems.reduce(
      (total, item) => total + ((item.shippingCharge || 0) * item.quantity),
      0
    );

    const couponDiscount = appliedCoupon 
      ? (appliedCoupon.discountType === 'percentage' 
          ? Math.round(subtotal * appliedCoupon.discount / 100)
          : appliedCoupon.discount)
      : 0;

    const grandTotal = subtotal + totalGST + totalShipping - couponDiscount;

    return (
      <CartContext.Provider
        value={{
          cartItems,
          addToCart,
          increaseQuantity,
          decreaseQuantity,
          removeFromCart,
          clearCart,
          totalItems,
          subtotal,
          totalGST,
          totalShipping,
          couponDiscount,
          grandTotal,
          savedForLater,
          saveForLater,
          moveToCartFromSaved,
          removeFromSaved,
          appliedCoupon,
          applyCoupon,
          removeCoupon,
        }}
      >
        {children}
      </CartContext.Provider>
    );
  };

  export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
      throw new Error(
        "useCart must be used inside CartProvider"
      );
    }

    return context;
  };