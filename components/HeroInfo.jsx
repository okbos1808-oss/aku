import * as motion from "motion/react-client"
const HeroInfo = () => {
  return (
    <motion.div initial={{opacity:0, y:50}} animate ={{opacity:1, y:0}} transition={{delay:0.5}} className="sm:absolute bottom-0 left-0 sm:bg-slate-700/75 sm:text-white grid sm:grid-cols-3
    w-full text-center h-56 items-center bg-transparent text-slate-700 sm:mt-0 mt-16 grid-cols-2 sm:gap-0 gap-7">
      <div>
        <p className="text-5xl font font-bold">20+</p>
        <h2 className="mt-3 text-xl">Proyek Selesai</h2>
      </div>
      <div>
        <p className="text-5xl font font-bold">15</p>
        <h2 className="mt-3 text-xl">Mitra</h2>
      </div>
      <div>
        <p className="text-5xl font font-bold">100</p>
        <h2 className="mt-3 text-xl">Karyawan</h2>
      </div>
    </motion.div>
  );
};

export default HeroInfo;
