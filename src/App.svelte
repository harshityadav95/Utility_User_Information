<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  type InfoItem = {
    name: string;
    value: string;
    updatedAt?: Date;
    refreshInterval?: string;
  };

  const info = writable<InfoItem[]>([]);

  function updateInfo(name: string, value: string, refreshInterval?: string) {
    info.update(items => {
      const now = new Date();
      const existing = items.find(i => i.name === name);
      if (existing) {
        existing.value = value;
        existing.updatedAt = now;
        if (refreshInterval) existing.refreshInterval = refreshInterval;
      } else {
        items.push({ name, value, updatedAt: now, refreshInterval });
      }
      return items;
    });
  }

  onMount(() => {
    // Static info
    updateInfo('User Agent', navigator.userAgent);
    updateInfo('Platform', navigator.platform);
    updateInfo('Language', navigator.language);
    updateInfo('Online Status', navigator.onLine.toString());
    updateInfo('Cookie Enabled', navigator.cookieEnabled.toString());
    updateInfo('Hardware Concurrency', navigator.hardwareConcurrency.toString());
    if ((navigator as any).deviceMemory) {
      updateInfo('Device Memory', `${(navigator as any).deviceMemory} GB`);
    }
    updateInfo('Screen Size', `${window.screen.width} x ${window.screen.height}`);
    updateInfo('Viewport Size', `${window.innerWidth} x ${window.innerHeight}`);
    updateInfo('Time Zone', Intl.DateTimeFormat().resolvedOptions().timeZone);

    // Network info
    const connection = (navigator as any).connection;
    if (connection) {
      updateInfo('Network Type', connection.effectiveType, 'onchange');
      updateInfo('Downlink', `${connection.downlink} Mb/s`, 'onchange');
      connection.addEventListener('change', () => {
        updateInfo('Network Type', connection.effectiveType, 'onchange');
        updateInfo('Downlink', `${connection.downlink} Mb/s`, 'onchange');
      });
    }

    // Battery info
    navigator.getBattery?.().then(battery => {
      updateInfo('Battery Level', `${Math.round(battery.level * 100)}%`, 'levelchange');
      updateInfo('Battery Charging', battery.charging.toString(), 'chargingchange');
      battery.addEventListener('levelchange', () => {
        updateInfo('Battery Level', `${Math.round(battery.level * 100)}%`, 'levelchange');
      });
      battery.addEventListener('chargingchange', () => {
        updateInfo('Battery Charging', battery.charging.toString(), 'chargingchange');
      });
    });

    // Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(pos => {
        const coords = pos.coords;
        updateInfo('Latitude', coords.latitude.toString(), 'watchPosition');
        updateInfo('Longitude', coords.longitude.toString(), 'watchPosition');
        updateInfo('Altitude', coords.altitude?.toString() ?? 'N/A', 'watchPosition');
        updateInfo('Accuracy', coords.accuracy.toString(), 'watchPosition');
      });
    }

    // Device orientation
    window.addEventListener('deviceorientation', event => {
      updateInfo('Alpha', event.alpha?.toString() ?? 'N/A', 'deviceorientation');
      updateInfo('Beta', event.beta?.toString() ?? 'N/A', 'deviceorientation');
      updateInfo('Gamma', event.gamma?.toString() ?? 'N/A', 'deviceorientation');
    });

    // Orientation change
    window.addEventListener('orientationchange', () => {
      updateInfo('Orientation', screen.orientation?.type ?? window.orientation?.toString() ?? 'N/A', 'orientationchange');
    });
  });
</script>

<main class="p-4 max-w-4xl mx-auto">
  <h1 class="text-2xl font-bold mb-4">User Information</h1>
  <div class="overflow-auto">
    <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead class="bg-gray-200">
        <tr>
          <th class="px-4 py-2 text-left">Name</th>
          <th class="px-4 py-2 text-left">Value</th>
          <th class="px-4 py-2 text-left">Last Updated</th>
          <th class="px-4 py-2 text-left">Refresh Interval</th>
        </tr>
      </thead>
      <tbody>
        {#each $info as item (item.name)}
          <tr class="border-t">
            <td class="px-4 py-2">{item.name}</td>
            <td class="px-4 py-2">{item.value}</td>
            <td class="px-4 py-2">{item.updatedAt?.toLocaleTimeString()}</td>
            <td class="px-4 py-2">{item.refreshInterval ?? '-'}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</main>
