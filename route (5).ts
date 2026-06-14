@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 222 47% 9%;
    --foreground: 210 40% 98%;
    --card: 222 47% 11%;
    --card-foreground: 210 40% 98%;
    --popover: 222 47% 9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217 91% 60%;
    --primary-foreground: 210 40% 98%;
    --secondary: 188 86% 43%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217 33% 17%;
    --muted-foreground: 215 20% 65%;
    --accent: 188 86% 43%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 217 33% 17%;
    --input: 217 33% 17%;
    --ring: 217 91% 60%;
    --radius: 0.75rem;
  }
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #0b1120;
  color: white;
  @apply antialiased font-body;
}

@layer utilities {
  .font-headline {
    font-family: 'Space Grotesk', sans-serif;
  }
  .font-body {
    font-family: 'Inter', sans-serif;
  }
  .glass-card {
    @apply bg-white/[0.02] backdrop-blur-xl border border-white/5 shadow-2xl;
  }
  .gradient-text {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary;
  }
}