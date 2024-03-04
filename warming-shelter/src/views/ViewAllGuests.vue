<template>
    <div>
        <Header />
        <br>
        <Wrapper>
            <table class="w-full border-2 border-blue-200">
                <thead class="bg-blue-200">
                    <tr>
                        <th class="text-left p-3">Name<i class="bi-alarm"></i></th>
                        <th class="text-left p-3">Date Last Stayed</th>
                        <th class="sr-only">View Profile</th>
                    </tr>
                </thead>
                <tbody class="rounded">
                    <tr class="border-b-2 border-blue-200 h-14" v-for="(site, index) in sites" :key="index">
                        <td class="px-3">{{ site.name }}</td>
                        <td class="px-3">{{ site.link }}</td>
                        <td class="px-3"><span class="flex w-10 rounded justify-center py-2 font-bold" :class="[
                        site.errors == 0 ? 'bg-success text-white' : '',
                        site.errors > 0 && site.errors < 5 ? 'bg-warning text-white' : '',
                        site.errors > 5 ? 'bg-danger text-white' : '',
                        ]">{{ site.errors }}</span></td>
                        <td class="px-3">{{ site.lastScanned }}</td>
                        <td class="px-3 text-right"><button @click="redirect(uid)" class="bg-primary text-white rounded px-3 py-2">View Details</button></td>
                    </tr>
                </tbody>
            </table>
        
        </Wrapper>
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import Wrapper from '../components/Wrapper.vue'

const uri = "mongodb+srv://api_user:1Ivc1FP8YB53fO2f@hrdc.ipzzoq8.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {});

try {
    await client.connect();
    console.log("Connected correctly to server");

    const collection = client.db("test").collection("guests");
    const guestData = await collection.find();
} catch (err) {
        console.log(err.stack);
    } finally { 
        await client.close();
    }

export default {
    name: 'Dashboard',
    components: {
      Header,
      Wrapper
    },
    guestData
   
}
</script>
        
        