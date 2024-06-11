module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Pastikan ini mencakup semua file tempat Anda menggunakan Tailwind CSS
    "./public/index.html", // Tambahkan file HTML jika Anda juga menggunakan kelas utilitas di sana
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f7f7f7",
        secondary: "#21b6e0",
      },
    },
  },
  plugins: [require("daisyui")],
};
