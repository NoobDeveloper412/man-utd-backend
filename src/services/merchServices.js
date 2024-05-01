// services/merchService.js
console.log(process.env.SUPABASE_URL)

export async function createMerch(file, name, description, price, stock) {
    // Upload image to Supabase
    const resp = await supabase
        .storage
        .from('images')
        .upload(`merch-images/${file.originalname}`, file.stream);

    console.log(resp)
    const { data: uploadData, error: uploadError } = resp
    console.log("Uploading image", uploadError)
    if (uploadError) throw new Error(uploadError.message);

    // Construct the image URL
    const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${uploadData.fullPath}`;

    console.log("Creating image", imageUrl)
    // Insert new item record into the merch table
    const { data: merchData, error: merchError } = await supabase
        .from('merchandise')
        .insert([
            { name, description, price, image_url: imageUrl, stock }
        ]);
    console.log("Uploading image",)

    if (merchError) throw new Error(merchError.message);

    return merchData;
}


export const getAllMerch = async () => {
    const { data, error } = await supabase
        .from('merchandise')
        .select('*');

    if (error) {
        console.error('Error fetching merchandise:', error.message);
        throw new Error(error.message);
    }

    return data;
};

export const updateMerch = async (id, data) => {
    const { data: updatedData, error } = await supabase
        .from('merchandise')
        .update(data)
        .match({ id });

    if (error) {
        throw new Error(`Failed to update merchandise: ${error.message}`);
    }

    return updatedData;
};

export const deleteMerch = async (id) => {
    const { data: deletedData, error } = await supabase
        .from('merchandise')
        .delete()
        .match({ id });

    if (error) {
        throw new Error(`Failed to delete merchandise: ${error.message}`);
    }

    return deletedData;
};