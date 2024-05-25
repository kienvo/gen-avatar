#!/usr/bin/env bash
source /media/kein/876e9192-d65f-4628-ad15-8c61a01c019e/central-data/PROJECTS/neon-gpu-venv/bin/activate
BASEDIR=$(dirname $0)
python3 $BASEDIR/gen_grouped_samples.py \
    --network $BASEDIR/pretrained/omniavatar.pkl \
    --outdir results \
    --label-pool $BASEDIR/pretrained/ffhq_labels.npy \
    --trunc 0.1 \
    --cfg ffhq_3dmm \
    --num-groups 1 \
    --num-samples 1 \
    --sample_mult 1 \
    "$@"