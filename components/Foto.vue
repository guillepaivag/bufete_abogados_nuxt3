<template>
    <div>
        <!-- image input -->
        <input type="file" :name="uploadFieldName" @change="onFileChange($event.target.name, $event.target.files)"/>

        <!-- error dialog displays any potential error messages -->
        <v-dialog v-model="errorDialog" max-width="300">
            <v-card>
                <v-card-text class="subheading">
                    {{ errorText }}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="errorDialog = false" flat>Got it!</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <div class="mt-5">
            <v-btn v-if="formData" text class="mt-1 mb-1 text-white mr-3" color="#6200ee"  @click="actualizarFoto"
                :loading="saving || deleting" :disabled="!formData">Actualizar foto</v-btn>
        </div>
    </div>
</template>

<script>
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase-services/apps/firebaseStorageDefault.js"
export default {
    name: 'Foto',
    data() {
        return {
            saving: false,
            saved: false,
            deleting: false,
            deleted: false,
            errorDialog: null,
            errorText: '',
            uploadFieldName: 'file',
            maxSize: 1024,
            foto: '',
            formData: null,
            imageFile: null,
        }
    },
    props: {
        servicio: Object,
        estado: Object
    },
    watch: {
    },
    methods: {

        onFileChange(fieldName, files) {
            const { maxSize } = this

            this.saved = false
            this.deleted = false
            this.formData = null
            this.imageFile = files[0]

            if (files.length === 1) {
                let size = this.imageFile.size / maxSize / maxSize
                if (!this.imageFile.type.match('image.png') && !this.imageFile.type.match('image.jpg') && !this.imageFile.type.match('image.jpeg')) {
                    // check whether the upload is an image
                    this.errorDialog = true
                    this.errorText = 'Se debe elegir un archivo imagen jpg o png.'
                    this.formData = null
                    this.imageFile = null
                    return
                }

                if (size > 5) {
                    // check whether the size is greater than the size limit
                    this.errorDialog = true
                    this.errorText = 'El archivo es muy grande, favor elegir un archivo de hasta 5MB.'
                    this.formData = null
                    this.imageFile = null
                    return
                }
                // Append file into FormData and turn file into image URL
                this.formData = new FormData()
                this.formData.append('image', this.imageFile)
                this.foto = URL.createObjectURL(this.imageFile)
            } else {
                this.formData = null
                this.imageFile = null
                // Mostrar error
                this.errorDialog = true
                this.errorText = 'Solo se puede subir una foto.'
            }
        },
        reiniciarImagen() {
            const foto = this.servicio.foto
            this.foto = foto ? foto : ''
            this.formData = null
            this.imageFile = null
        },
        async actualizarFoto() {
            this.saving = true
            this.estado.cargando = true

            try {
                const storageRef = ref(storage, `${this.servicio.uid}/nuevo/${this.imageFile.name}`);
                const uploadTask = uploadBytesResumable(storageRef, this.imageFile);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                        console.log('error', error)
                        //const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
                        this.saving = false
                        this.estado.cargando = false
                        this.reiniciarImagen()
                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        
                        this.servicio.foto = this.foto
                        this.saved = true
                        this.saving = false
                        this.estado.cargando = false
                        this.reiniciarImagen()

                    }
                );

            } catch (error) {
                console.log('error', error)
                //const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
                this.saving = false
                this.estado.cargando = false
                this.reiniciarImagen()
            }
        },
    },

    created() {
        const foto = this.servicio.foto
        this.foto = foto ? foto : ''
    }
}
</script>