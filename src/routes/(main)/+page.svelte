<script lang="ts">
    import Button from "$lib/components/Button.svelte";
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
            <Button>Get started</Button>
            <Button color="secondary">Learn more</Button>
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
            {#each Array.from({ length: 6 }) as _}
                <div
                    class="border px-6 py-6 rounded-xl shadow-md shadow-blue-50 bg-white border-blue-100 flex flex-col gap-2"
                >
                    <div
                        class="p-2 bg-blue-100 text-blue-700 w-8 h-8 flex items-center justify-center rounded-md"
                    >
                        <span>i</span>
                    </div>
                    <h3 class="text-lg font-semibold sm:text-xl md:text-2xl">
                        Foo
                    </h3>
                    <div class="text-sm">
                        Lorem ipsum dolor sit amet. sakndlsanm ..s daklsdkas
                        sdaklndasjldnasjkndkas hjkb asbd jksabjkd bjkasbd
                        jkasbkjd ba
                    </div>
                </div>
            {/each}
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
