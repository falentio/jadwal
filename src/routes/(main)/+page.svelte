<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import CalendarMonth from "~icons/mdi/calendar-month";
    import LinkVariant from "~icons/mdi/link-variant";
    import Earth from "~icons/mdi/earth";
    import Sync from "~icons/mdi/sync";
</script>

<section class="bg-blue-50 py-12 md:py-24 lg:py-32">
    <div
        class="flex flex-col items-center gap-6 container mx-auto px-6 text-center"
    >
        <h1 class="font-bold text-3xl sm:text-4xl md:text-5xl tracking-tighter">
            Kelola jadwal sekolahmu dengan mudah.
        </h1>
        <p class="text-gray-600 font-medium">
            Solusi simple untuk mengelola jadwal dengan cara baru
        </p>
        <div>
            <Button href="/auth/login">Mulai</Button>
            <Button color="secondary" href="#features">Fitur</Button>
        </div>
    </div>
</section>

<section class="px-6 py-12 md:py-24">
    <div class="flex flex-col items-center gap-6">
        <h2
            class="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-center"
        >
            Keuntungan web ini?
        </h2>
        <p class="max-w-3xl flex flex-col gap-4">
            <span>
                Jadwal mu akan mudah untuk dikelola, mudah dilihat, dan juga
                dengan tampilan yang menarik. Bayangkan betapa nyamannya saat
                semua jadwal tersusun rapi dalam satu platform!.
            </span>
            <span>
                Yang lebih seru lagi, kamu juga akan dapat membagikan website mu
                kepada teman kelasmu agar mereka dapat dengan mudah melihat
                jadwal.
            </span>
            <span>
                Lupakan kertas yang mudah hilang atau pesan grup yang tenggelam,
                jadikan aplikasi ini pusat informasi jadwal sekolahmu!
            </span>
        </p>
        <Button href="#features">Fitur kami</Button>
    </div>
</section>

<section id="features" class="bg-gradient-to-b from-white to-blue-50 px-6">
    <div class="flex flex-col items-center gap-6">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter">
            Fitur kami
        </h2>
        <p>Kebutuhan mu dalam mengelola jadwal secara efektif</p>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-4">
            <div
                class="border px-6 py-6 rounded-xl shadow-md shadow-blue-50 bg-white border-blue-100 flex flex-col gap-2"
            >
                <div
                    class="p-2 bg-blue-100 text-blue-700 w-8 h-8 flex items-center justify-center rounded-md"
                >
                    <CalendarMonth />
                </div>
                <h3 class="text-lg font-semibold sm:text-xl md:text-2xl">
                    Jadwal Interaktif
                </h3>
                <div class="text-sm">
                    Lihat jadwal sekolah dalam tampilan yang interaktif dan
                    mudah dibaca. Akses cepat untuk melihat mata pelajaran hari
                    ini, besok, atau minggu depan.
                </div>
            </div>
            <div
                class="border px-6 py-6 rounded-xl shadow-md shadow-blue-50 bg-white border-blue-100 flex flex-col gap-2"
            >
                <div
                    class="p-2 bg-blue-100 text-blue-700 w-8 h-8 flex items-center justify-center rounded-md"
                >
                    <LinkVariant />
                </div>
                <h3 class="text-lg font-semibold sm:text-xl md:text-2xl">
                    Berbagi Link
                </h3>
                <div class="text-sm">
                    Bagikan jadwal dengan teman sekelas melalui link khusus.
                    Mereka bisa mengakses jadwal tanpa perlu login atau membuat
                    akun.
                </div>
            </div>
            <div
                class="border px-6 py-6 rounded-xl shadow-md shadow-blue-50 bg-white border-blue-100 flex flex-col gap-2"
            >
                <div
                    class="p-2 bg-blue-100 text-blue-700 w-8 h-8 flex items-center justify-center rounded-md"
                >
                    <Earth />
                </div>
                <h3 class="text-lg font-semibold sm:text-xl md:text-2xl">
                    Akses Multi-Platform
                </h3>
                <div class="text-sm">
                    Akses jadwal dari mana saja menggunakan perangkat apapun -
                    laptop, tablet, atau smartphone. Tampilan responsif untuk
                    pengalaman optimal.
                </div>
            </div>
            <div
                class="border px-6 py-6 rounded-xl shadow-md shadow-blue-50 bg-white border-blue-100 flex flex-col gap-2"
            >
                <div
                    class="p-2 bg-blue-100 text-blue-700 w-8 h-8 flex items-center justify-center rounded-md"
                >
                    <Sync />
                </div>
                <h3 class="text-lg font-semibold sm:text-xl md:text-2xl">
                    Update Real-time
                </h3>
                <div class="text-sm">
                    Perubahan jadwal langsung diperbarui secara real-time untuk
                    semua pengguna, sehingga semua orang selalu memiliki
                    informasi terbaru.
                </div>
            </div>
            <div></div>
        </div>
    </div>
</section>

<section
    class="flex flex-col bg-blue-600 text-white py-12 md:py-24 text-center items-center px-6 gap-6"
>
    <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter">
        Siap membuat jadwal mu menjadi interaktif?
    </h2>
    <p>Buat jadwal mu menjadi interaktif seperti ratusan orang lainnya</p>
    <Button href="/auth/login" color="inverse">Mulai sekarang</Button>
</section>
