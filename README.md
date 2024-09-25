# Uber
This project is built using React Native and TailwindCSS for the user interface, Google Maps API for rendering real-time maps with directions, PostgreSQL (NeonDB) for database.

# ⚙️ Tech Stack
• React Native

• Expo

• PostgreSQL

• Google Maps

• Zustand

• Clerk

• Tailwind CSS

# 🔋 Features
👉 Onboarding Flow: Seamless user registration and setup process.

👉 Email Password Authentication with Verification: Secure login with email verification.

👉 oAuth Using Google: Easy login using Google credentials.

👉 Authorization: Secure access control for different user roles.

👉 Home Screen with Live Location & Google Map: Real-time location tracking with markers on a map.

👉 Recent Rides: View a list of recent rides at a glance.

👉 Google Places Autocomplete: Search any place on Earth with autocomplete suggestions.

👉 Find Rides: Search for rides by entering 'From' and 'To' locations.

👉 Select Rides from Map: Choose available cars near your location from the map.

👉 Confirm Ride with Detailed Information: View complete ride details, including time and fare price.

👉 History: Review all rides booked so far.

👉 Responsive on Android and iOS: Optimized for both Android and iOS devices.

and many more, including code architecture and reusability

# 📦 Dependencies

### Tailwind CSS - https://www.nativewind.dev/quick-starts/expo
    npm install nativewind
    npm install --save-dev tailwindcss@3.3.2
    npx tailwindcss init (Add folders inside tailwind.config.js > content)
    Add plugins array in babel.config.js (plugins: ["nativewind/babel"],)

### React Native Swiper - https://www.npmjs.com/package/react-native-swiper
    npm i react-native-swiper

### Clerk/Clerk/Expo - https://clerk.com/docs/quickstarts/expo
    npm install @clerk/clerk-expo

### Expo Secure Store - https://docs.expo.dev/versions/latest/sdk/securestore/
    npx expo install expo-secure-store

### React Native Modal - https://www.npmjs.com/package/react-native-modal
    npm i react-native-modal

### React Native Maps - https://www.npmjs.com/package/react-native-maps
    npm i react-native-maps

### React Native Maps Directions - https://www.npmjs.com/package/react-native-maps-directions
    https://www.npmjs.com/package/react-native-maps-directions

### Zustand - https://www.npmjs.com/package/zustand
    npm i zustand

### Expo Location - https://docs.expo.dev/versions/latest/sdk/location/
    npx expo install expo-location

### React Native Google Places Autocomplete - https://www.npmjs.com/package/react-native-google-places-autocomplete
    npm i react-native-google-places-autocomplete

### React Native Gesture Handler - https://www.npmjs.com/package/react-native-gesture-handler
    npm i react-native-gesture-handler

### React Native Bottom Sheet - https://www.npmjs.com/package/@gorhom/bottom-sheet
    npm i @gorhom/bottom-sheet

## https://docs.stripe.com/payments/accept-a-payment-deferred?platform=react-native
### Stripe - https://www.npmjs.com/package/stripe
    npm i stripe

### Stripe React Native - https://www.npmjs.com/package/@stripe/stripe-react-native
    npm i @stripe/stripe-react-native

# 💻 Preview

<table>
    <tr>
        <td>
            <img src="https://github.com/user-attachments/assets/179c6f27-7d8d-4898-a090-e52207dbe729" alt="splash" height="500"/>
        </td>
        <td>
            <img src="https://github.com/user-attachments/assets/f1f14c96-63ba-4d46-9ec6-05ce7947e02a" alt="home" height="500"/>
        </td>
        <td>
            <img src="https://github.com/user-attachments/assets/a0f811e1-4eb7-4abf-ba65-d6850db31ca1" alt="past-rides" height="500"/>
        </td>
    </tr>
    <tr>
        <td>
            <img src="https://github.com/user-attachments/assets/2d3bc394-7613-4e68-9d0a-9da4285dffa5" alt="find-ride" height="500"/>
        </td>
        <td>
            <img src="https://github.com/user-attachments/assets/1c1d17aa-aec8-46fd-9357-fbb43c34b01d" alt="find-driver" height="500"/>
        </td>
        <td>
            <img src="https://github.com/user-attachments/assets/2408a061-9678-4237-8cd7-e5b075a7b587" alt="confirm-ride" height="500"/>
        </td>
    </tr>
    <tr>
        <td>
            <img src="https://github.com/user-attachments/assets/1875a0e2-6bdf-4ad1-835e-f295818e197c" alt="ride-booked" height="500"/>
        </td>
    </tr>
</table>
