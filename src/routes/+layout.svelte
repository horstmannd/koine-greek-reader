<script>
  import '../app.css';
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;600&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap"
  />
</svelte:head>

<div class="min-h-screen">
  <header class="border-b border-amber-200/60 bg-white/80 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <div>
        <p class="text-xs uppercase tracking-[0.4em] text-amber-700">Koine Greek Reader</p>
        <h1 class="text-2xl font-semibold text-stone-900">1 John Study Workspace</h1>
      </div>
      <nav class="flex gap-6 text-sm text-stone-600">
        <a class="hover:text-stone-900" href="/reader/1john/1">Reader</a>
        <a class="hover:text-stone-900" href="/search">Search</a>
        <a class="hover:text-stone-900" href="/about">About</a>
      </nav>
    </div>
  </header>

  <main class="mx-auto max-w-6xl px-6 py-10">
    <slot />
  </main>

  <footer class="border-t border-amber-200/60 bg-white/70">
    <div class="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-stone-500">
      <p>
        Greek text from the SBL Greek New Testament (SBLGNT), CC BY 4.0. Adapted and
        normalized for study.
      </p>
      <p>Local-only data storage. No accounts. No tracking.</p>
    </div>
  </footer>
</div>
