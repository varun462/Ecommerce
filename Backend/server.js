const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Allow both origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
  
app.use(express.json());

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
});
const User = mongoose.model('User', userSchema);

const productSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
   price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category:{
          type:String,
          require:true,
    },
   image: {
        type: String,
        required: true,
    },
});
const Product = mongoose.model('Product', productSchema);

async function createAdminUser() {
    const adminEmail = 'admin@example.com';
    const adminUser = {
        email: adminEmail,
        password: await bcrypt.hash('adminpassword', 10),
        role: 'admin'
    };

    try {
        const existingUser = await User.findOne({ email: adminEmail });
        if (!existingUser) {
            await new User(adminUser).save();
            console.log('Admin user created successfully');
        } else {
            console.log('Admin user already exists');
        }
    } catch (err) {
        console.error('Error creating admin user:', err);
    }
}

mongoose.connect('mongodb+srv://varuncl:varun@varuncluster.hznyokm.mongodb.net/shop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(async () => {
        console.log('MongoDB connected');

        // Create admin user if not exists
        await createAdminUser();

        // Insert initial products if needed
        const productsCount = await Product.countDocuments();
        if (productsCount >= 20) {
            const product = [
                { _id: new mongoose.Types.ObjectId(), name: "smartphone", price: 29.99, description: "This is the description for product 1.", image: "https://cdn.pixabay.com/photo/2017/07/15/19/42/train-track-2507499_960_720.jpg" },
                { _id: new mongoose.Types.ObjectId(), name: "Product 2", price: 299.78, description: "This is the description for product 2.", image: "https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=600" },
                { _id: new mongoose.Types.ObjectId(), name: "Clothes", price: 458.66, description: "This is the description for product 3.", image: "https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=600" },
                { _id: new mongoose.Types.ObjectId(), name: "Makup kit", price: 123.99, description: "This is the description for product 4.", image: "https://images.pexels.com/photos/1115128/pexels-photo-1115128.jpeg?auto=compress&cs=tinysrgb&w=600" },
                { _id: new mongoose.Types.ObjectId(), name: "Headset", price: 49.50, description: "This is the description for product 5.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHNldHxlbnwwfHwwfHx8MA%3D%3D" },
                { _id: new mongoose.Types.ObjectId(), name: "Comb", price: 149.50, description: "This is the description for product 6.", image: "https://img.freepik.com/free-photo/plastic-closeup-horizontal-white-accessory_1203-6309.jpg?size=626&ext=jpg&ga=GA1.1.1994309225.1716444288&semt=ais_user_b" },
                { _id: new mongoose.Types.ObjectId(), name: "SmatWatch", price: 549.50, description: "This is the description for product 7.", image: "https://img.freepik.com/free-vector/smart-watch-with-phone-realistic-composition_1284-17016.jpg?t=st=1716480198~exp=1716483798~hmac=d2d9129d47f692a033d1023c04251c735996961603830d48e5cdd0c35892a27a&w=740" },
                {_id: new mongoose.Types.ObjectId(), name: "Product 8", price: 548.50, description: "This is the description for product 8.", image: "https://images.pexels.com/photos/40739/mobile-phone-smartphone-tablet-white-40739.jpeg?auto=compress&cs=tinysrgb&w=600"},
                {_id:new mongoose.Types.ObjectId(),name:"Product 9",price:548.5015,description:"this is product 9",image:"https://images.pexels.com/photos/40739/mobile-phone-smartphone-tablet-white-40739.jpeg?auto=compress&cs=tinysrgb&w=600"},
        
            
            ]
            // await Product.insertMany(product);
            // //console.log(product);
            // console.log('Products inserted successfully');
            try {
                await Product.insertMany(product);
                console.log('Products inserted successfully');
            } catch (error) {
                console.error('Error inserting products:', error);
            }
            
        }
        const port = process.env.PORT || 3001; 
        app.listen(port, () => {
            console.log('Server is running on port 3001');
        });
    })
    .catch(err => console.error('MongoDB connection error:', err));

    app.post('/api/Logout', (req, res) => {
        // Perform logout logic here, such as clearing cookies or tokens
        res.json({ message: 'Logout successful' });
      });

      app.post('/api/purchase', (req, res) => {
        // Perform logout logic here, such as clearing cookies or tokens
        res.json({ message: 'Purchase successfully the item' });
      });

app.post('/api/signup', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const existingUser = await User.findOne({ email });
        //console.log(existingUser);
        if (existingUser) {
            return res.status(201).send({ message: 'Email already in use' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: 'Error creating user' });
    }
});

app.post('/api/login', async (req, res) => {
    console.log("login ");
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(400).send({ error: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        //console.log(isPasswordValid);
        if (!isPasswordValid) {
            return res.status(400).send({ error: 'Invalid password' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, "jwtSecret", { expiresIn: 4000000});
        console.log(token);
        res.send({ token, user });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error logging in' });
    }
});

const checkAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token missing' });
        }
        console.log('Received token:', token);
        const decodedToken = jwt.verify(token, "jwtSecret");
        console.log('Decoded token:', decodedToken);
        const user = await User.findById(decodedToken.id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        console.log('Authenticated user:', user);
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
});

// Add a product
app.post('/api/products/add', checkAdmin, async (req, res) => {
    try {
        const { name, description, price, image } = req.body;
        const newProduct = new Product({ _id: new mongoose.Types.ObjectId(), name, price, description, image });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a product
app.delete('/api/products/delete/:id', checkAdmin, async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

   
    
});