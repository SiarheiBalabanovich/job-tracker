const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const cors = require('@koa/cors');

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyParser());

mongoose.connect('mongodb+srv://sbalabanovichdeveloper:dUUjbL0Mwy8HIjeC@cluster0.3bjrh.mongodb.net/?retryWrites=true&w=majority');

// схема и модель для вакансий
const jobSchema = new mongoose.Schema({
  company: String,
  position: String,
  salaryRange: String,
  status: String,
  notes: String,
});

const Job = mongoose.model('Job', jobSchema);

router.get('/api/jobs', async (ctx) => {
  ctx.body = await Job.find();
});

router.post('/api/jobs', async (ctx) => {
  const newJob = new Job(ctx.request.body);
  await newJob.save();
  ctx.body = newJob;
});

router.put('/api/jobs/:id', async (ctx) => {
  const job = await Job.findByIdAndUpdate(ctx.params.id, ctx.request.body, { new: true });
  ctx.body = job;
});

router.delete('/api/jobs/:id', async (ctx) => {
  await Job.findByIdAndDelete(ctx.params.id);
  ctx.body = { message: 'Job deleted' };
});

app.use(router.routes()).use(router.allowedMethods());

const PORT = 4000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));