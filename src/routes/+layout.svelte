<script lang="ts">
  import '../app.css';
</script>

<header>
  <nav>
    <!-- Admin Navigation links -->
    <a href="/admin/dashboard">Dashboard</a>
    <a href="/admin/settings">Settings</a>
  </nav>
</header>

<main>
  <slot></slot>
  <!-- Content of the admin pages will be injected here -->
</main>

<footer>
  <p>Admin Footer content here</p>
</footer>
